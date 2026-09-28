import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('----------------------------------------------------');
console.log('🚀 Hostinger Automated Deployment Helper');
console.log('----------------------------------------------------');

if (!fs.existsSync(distDir)) {
  console.error('❌ Error: "dist" folder not found. Please run "npm run build" first.');
  process.exit(1);
}

// Check for .env file or env variables
const envPath = path.join(rootDir, '.env');
let env = { ...process.env };

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const ftpHost = env.HOSTINGER_FTP_HOST || env.FTP_SERVER;
const ftpUser = env.HOSTINGER_FTP_USER || env.FTP_USERNAME;
const ftpPassword = env.HOSTINGER_FTP_PASSWORD || env.FTP_PASSWORD;

if (!ftpHost || !ftpUser || !ftpPassword) {
  console.log('ℹ️  FTP credentials not detected in environment or .env file.');
  console.log('👉 To enable 1-command direct deployment:');
  console.log('   Create a .env file in the project root with:');
  console.log('   HOSTINGER_FTP_HOST=ftp.yourdomain.com (or your Hostinger FTP IP)');
  console.log('   HOSTINGER_FTP_USER=your_hostinger_ftp_username');
  console.log('   HOSTINGER_FTP_PASSWORD=your_hostinger_ftp_password');
  console.log('');
  console.log('📦 Alternatively, dist.zip has been prepared for direct upload in Hostinger File Manager:');
  console.log(`   File: ${path.join(rootDir, 'dist.zip')}`);
  process.exit(0);
}

async function upload() {
  let ftp;
  try {
    ftp = await import('basic-ftp');
  } catch (err) {
    console.error('❌ basic-ftp is not installed. Run: npm install basic-ftp --save-dev');
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`📡 Connecting to ${ftpHost}...`);
    await client.access({
      host: ftpHost,
      user: ftpUser,
      password: ftpPassword,
      secure: false, // Set to true if FTPS is enforced
    });

    console.log('📁 Connected! Uploading dist/ contents to public_html...');
    await client.uploadFromDir(distDir, 'public_html');
    console.log('✅ Deployment to Hostinger successful! Your changes are live!');
  } catch (err) {
    console.error('❌ Deployment error:', err.message);
  } finally {
    client.close();
  }
}

upload();
