/**
 * Fetch repositories for user 'daneyyhh'
 * Returns a promise that resolves to an array of repositories
 */
export const fetchGitHubProjects = async () => {
    try {
        const response = await fetch('https://api.github.com/users/daneyyhh/repos?sort=updated&per_page=10');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // Filter out forked repos if desired, or keep all.
        // For now, we return all non-forked, public repos.
        return data.filter(repo => !repo.fork && !repo.private);
    } catch (error) {
        console.error("GitHub API Error:", error);
        return [];
    }
};
