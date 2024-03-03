


export const getResourceType = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('image')) {
                return 'image';
            } else if (contentType && contentType.startsWith('video')) {
                return 'video';
            } else {
                return 'unknown';
            }
        } else {
            throw new Error(`Failed to fetch resource from URL: ${url}`);
        }
    } catch (error) {
        console.error(error);
        return 'unknown';
    }
}