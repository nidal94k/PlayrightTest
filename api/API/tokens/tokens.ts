import {test, expect, APIRequestContext} from '@playwright/test';
import { testData } from "../../e2e/testData";

interface ResponseObj {
    token: string;
    expires: string;
    status: string;
    result: string;
}

export class TokenAPI{
    readonly reqContext: APIRequestContext;

    constructor(request: APIRequestContext)
    {
        this.reqContext = request;
    }

    public async generateToken(body: any, status: any)
    {
        let statusResponse: any;
        let callResponse: any;

        await test.step('I generate a new token', async () => {
            const respose = await this.reqContext.post(`${testData.BaseURL}/Account/v1/GenerateToken` , {
                'headers': {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                },
                data: body
            });

            statusResponse = respose.status();
            callResponse = await respose.json();
        })
        await test.step(`the token status is ${status}`, async() => {
            expect(statusResponse).toBe(status);
        })
        
        await test.step('the user resonse body matches the expected body', async() => {
            expect(await callResponse.status).toEqual("Success");
            expect(await callResponse.result).toEqual("User authorized successfully.");
        })

        await test.step('grab token', async() => {
            testData.Token = callResponse.token;
        })
    }
}