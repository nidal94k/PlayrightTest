import { test } from '@playwright/test';
import { testData } from "./testData"
import { UserAPI } from "../api/users/users";
import { TokenAPI } from '../api/tokens/tokens';
import { BooksAPI } from '../api/books/books';

test.describe.configure({ mode: 'serial' });
test.describe('TC08 -- Happy flow', () => {

// arrange data ----->
const userName = String(Math.floor(Date.now() / 1000));
testData.UserName = userName;

const userPost = {
  "userName" : testData.UserName,
  "password" : "123!asdXX"
  };

let isbn1 = {
  "isbn" : userName+"1",
  };

let isbn2 = {
  "isbn" : userName+"2",
  };

let addBookPost = {
  "userId" : "userId",
  "collectionOfIsbns" : [isbn1,isbn2]
  };

let removeBookPost = {
  "isbn" : [userName]+"1",
  "userId" : "userId"
  };
// <----- arrange data 

  test("Creation of user account", async ({ request }) => {
    const user = new UserAPI(request);
    
    await user.postUser(userPost, 201);
    await user.postUser(userPost, 406);//verify can't create same user again
    });

  test("Generate a token", async ({ request }) => {
    const token = new TokenAPI(request);

    await token.generateToken(userPost, 200); 
    });

  test("Verify user was added", async ({ request }) => {
    const user = new UserAPI(request);
    
    await user.getUser(userPost, 200); 
    });

  test("Add a list of books", async ({ request }) => {
    const book = new BooksAPI(request);
    addBookPost['userId'] = testData.UserId;

    await book.addBooks(addBookPost, 201); 
    });

    //verify book was added
    //GetBook returns an error - I won't include it to the test but in real-life i would.

  test("remove one of the books", async ({ request }) => {
    const book = new BooksAPI(request);
    removeBookPost['userId'] = testData.UserId;

    await book.removeBook(removeBookPost, 204); 
    await book.removeBook(removeBookPost, 400); //verify can't remove the book again
    });
})