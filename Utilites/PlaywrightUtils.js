class PlaywrightUtils {
    static async selectRandomOption(dropdown) {
        const options = await dropdown.locator('option:not([disabled])')
            .filter({ hasText: /.+/ })
            .all();
        
        if (options.length === 0) {
            throw new Error('No selectable options found in the dropdown');
        }
        // Select a random option
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex];
        const value = await randomOption.getAttribute('value');

        // Select the option in the dropdown
        await dropdown.selectOption(value);
        return value;
    }
    static async alertHandler(page) {
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
    }
}
export default PlaywrightUtils;