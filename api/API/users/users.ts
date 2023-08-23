import {test, expect, APIRequestContext} from '@playwright/test';
import { testData } from "../../e2e/testData";

interface OKBodyObj {
    userName: string;
    password: string;
    books: Array<any>;
}

export class UserAPI{
    readonly reqContext: APIRequestContext;
    
    constructor(request: APIRequestContext)
    {
        this.reqContext = request;
    }

    public async postUser(body: any, status: any)
    {
        let statusResponse: any;
        let callResponse: any;

        await test.step('I create a new user', async () => {
            const respose = await this.reqContext.post(`${testData.BaseURL}/Account/v1/User` , {
                'headers': {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                },
                data: body
            });

            statusResponse = respose.status();
            callResponse = await respose.json();
        })
        await test.step(`the user status is ${status}`, async() => {
            expect(statusResponse).toBe(status);
        })

        let obj: OKBodyObj = body;
        
        await test.step('the user resonse body matches the expected body', async() => {
            if(status == 201)
                expect(await callResponse.username).toEqual(obj.userName);

            else if(status == 406) 
                expect(await callResponse.message).toEqual("User exists!");

            else if(status == 400) 
                expect(await callResponse.message).toEqual("UserName and Password required.");
        })

        await test.step('grab userId', async() => {
            if(status == 201)//grab only in case of successful POST
                testData.UserId = callResponse.userID;
        })
    }
    public async getUser(body: any, status: any)
    {
        let statusResponse: any;
        let callResponse: any;

        await test.step('I get details of a user', async () => {
            const respose = await this.reqContext.get(`${testData.BaseURL}/Account/v1/User/${testData.UserId}` , {
                'headers': {
                'accept': 'application/json',
                'authorization': `Bearer ${testData.Token}`,
                'Content-Type': 'application/json',
                },
                data: body
            });

            statusResponse = respose.status();
            callResponse = await respose.json();
        })
        await test.step(`the user status is ${status}`, async() => {
            expect(statusResponse).toBe(status);
        })
        
        await test.step('the user resonse body matches the expected body', async() => {
            if(status == 200)
                expect(await callResponse.userId).toEqual(testData.UserId);
            else if(status == 401)
                expect(await callResponse.message).toEqual("User not found!");
        })
    }
}