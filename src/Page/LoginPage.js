import {page} from Page;

export class Login {

    let username=page.locator("//input[@name='username']");
    let password=page.locator("//input[@name='password']");
    let signin=page.locator("//button[@name='Login");

    constructor()
    {
        this.username=username;
        this.password=password;
        this.signin=signin;
    }

    async function signin() {
        await username.fill("demo");
        await password.fill("pass123");
        await signin.click();
    }

}
