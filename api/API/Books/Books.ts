import {test, expect, APIRequestContext} from '@playwright/test';
import { testData } from "../../e2e/testData";

interface Isbn {
    isbn: string;
}

interface OKAddBodyObj {
    userId: any;
    collectionOfIsbns: Array<Isbn>;
}

interface OKAddBookResponseObj {
    books: Array<Isbn>;
}

export class BooksAPI{
    readonly reqContext: APIRequestContext;
    
    constructor(request: APIRequestContext)
    {
        this.reqContext = request;
    }

    public async addBooks(body: any, status: any)
    {
        let statusResponse: any;
        let callResponse: any;
        await test.step('I add a new list of books', async () => {
            const respose = await this.reqContext.post(`${testData.BaseURL}/BookStore/v1/Books` , {
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
        await test.step(`the adding-books status is ${status}`, async() => {
            expect(statusResponse).toBe(status);
        })

        let obj: OKAddBodyObj = body;
        let objResponse: OKAddBookResponseObj = callResponse;

        await test.step('the adding-books resonse body matches the expected body', async() => {
            expect(objResponse.books[0].isbn).toEqual(obj.collectionOfIsbns[0].isbn);
            expect(objResponse.books[1].isbn).toEqual(obj.collectionOfIsbns[1].isbn);
            expect(objResponse.books.length).toBe(obj.collectionOfIsbns.length);
        })
    }

    public async removeBook(body: any, status: any)
    {
        let statusResponse: any;
        let callResponse: any;
        await test.step('I add a new list of books', async () => {
            const respose = await this.reqContext.delete(`${testData.BaseURL}/BookStore/v1/Book` , {
                'headers': {
                'accept': 'application/json',
                'authorization': `Bearer ${testData.Token}`,
                'Content-Type': 'application/json',
                },
                data: body
            });

            statusResponse =  respose.status();
            try{
            callResponse = await respose.json();
            }catch(e)
            {
                console.error("no Json respons` expected")
            }

        })
        await test.step(`the removing-book status is ${status}`, async() => {
            expect(statusResponse).toBe(status);
        })

        await test.step('the removing-books resonse body matches the expected body', async() => {
            if(status == 400)
            {
                expect(callResponse.code).toEqual("1206");
                expect(callResponse.message).toEqual("ISBN supplied is not available in User's Collection!");
            }
            else if(status == 401)
            {
                expect(callResponse.code).toEqual("1207");
                expect(callResponse.message).toEqual("User Id not correct!");
            }
        })
    }
}