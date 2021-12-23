describe(
    '/ (Home Page)',
    () => {
        let page;
        const fields = {
            name: 'Test',
            email: 'test@test.com',
            subject: 'Reclamação',
            message: 'Lorem ipsumd dolor'
        };

        beforeEach(async () => {
            page = await global.__BROWSER__.newPage();
            await page.goto('http://localhost/2021/12/13/ola-mundo/');
        });

        it('should load without error', async () => {
            await expect(page.title()).resolves.toMatch('Olá, mundo!');
        });

        it('should show form', async() => {
            const formExists = await page.evaluate(() => {
                return !!document.querySelector('form.wpcf7-form');
            });

            await expect(formExists).toBe(true);
        });

        it('can fill all fields on form', async() => {
            await page.type('form.wpcf7-form [name="your-name"]', fields.name);
            await page.type('form.wpcf7-form [name="your-email"]', fields.email);
            await page.select('form.wpcf7-form [name="subject"]', fields.subject);
            await page.type('form.wpcf7-form [name="your-message"]', fields.message);

            const form = await page.$('form.wpcf7-form');
            await form.evaluate(form => form.submit());

            await page.waitForSelector('form.wpcf7-form .wpcf7-response-output');

            const hasErrors = await page.evaluate(() => {
                return !!document.querySelector('form.wpcf7-form .wpcf7-not-valid-tip');
            });

            await expect(hasErrors).toBe(false);
        });

        it('should not submit without subject field', async() => {
            await page.type('form.wpcf7-form [name="your-name"]', fields.name);
            await page.type('form.wpcf7-form [name="your-email"]', fields.email);
            await page.type('form.wpcf7-form [name="your-message"]', fields.message);

            const form = await page.$('form.wpcf7-form');
            await form.evaluate(form => form.submit());

            await page.waitForSelector('form.wpcf7-form .wpcf7-response-output');

            const hasErrors = await page.evaluate(() => {
                return !!document.querySelector('form.wpcf7-form .wpcf7-not-valid-tip');
            });

            await expect(hasErrors).toBe(true);
        });

        it('receive success message when submit with all fields', async() => {
            await page.type('form.wpcf7-form [name="your-name"]', fields.name);
            await page.type('form.wpcf7-form [name="your-email"]', fields.email);
            await page.select('form.wpcf7-form [name="subject"]', fields.subject);
            await page.type('form.wpcf7-form [name="your-message"]', fields.message);

            const form = await page.$('form.wpcf7-form');
            await form.evaluate(form => form.submit());

            await page.waitForSelector('form.wpcf7-form .wpcf7-response-output');

            const wasSent = await page.evaluate(() => {
                return !!document.querySelector('form.wpcf7-form.sent');
            });

            await expect(wasSent).toBe(true);
        });
    }
);