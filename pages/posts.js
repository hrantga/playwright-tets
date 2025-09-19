

class PostsPage {
    constructor(page) {
        this.page = page;
        this.postTitleInput = page.locator('#post-title');
        this.postContentInput = page.locator('#post-content');
        this.submitButton = page.locator('#submit-post');
        this.postsList = page.locator('#posts-list');
    }

    async navigate() {
        await this.page.goto('https://example.com/posts');
    }

    async createPost(title, content) {
        await this.postTitleInput.fill(title);
        await this.postContentInput.fill(content);
        await this.submitButton.click();
    }

    async getPosts() {
        return await this.postsList.locator('.post').allTextContents();
    }
}

export { PostsPage };