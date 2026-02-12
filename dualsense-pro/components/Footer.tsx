export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        DualSense Pro
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Elevating play since 2024. Precision engineered for the professional gamer.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Controllers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Customizer</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Drivers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Stay Connected</h4>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-full"
                        />
                        <button className="px-4 py-2 bg-blue-600 rounded text-sm font-bold hover:bg-blue-500 transition-colors">
                            →
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
                © 2024 DualSense Pro. All rights reserved. Not affiliated with Sony Interactive Entertainment.
            </div>
        </footer>
    );
}
