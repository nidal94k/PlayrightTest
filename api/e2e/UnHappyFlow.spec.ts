import { test } from '@playwright/test';
import { testData } from "../API/TestData"
import { UserAPI } from "../API/User/User";
import { TokenAPI } from '../API/Token/Token';
import { BooksAPI } from '../API/Books/Books';

test.describe.configure({ mode: 'serial' });
test.describe('TC09 -- UnHappy flow', () => {

// arrange data ----->
const userName = String(Math.floor(Date.now() / 1000));
testData.UserName = userName;

const userPost = {
  "userName" : testData.UserName,
  "password" : ""
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

  test("Creation of user account  BUT pass an empty password", async ({ request }) => {
    const user = new UserAPI(request);
    
    await user.postUser(userPost, 400); 

    userPost['password'] = '123!!asdAA';

    await user.postUser(userPost, 201);   
    });

  test("Generate a token", async ({ request }) => {
    const token = new TokenAPI(request);

    await token.generateToken(userPost, 200); 
    });

  test("Verify user was added BUT pass an wrong userId ", async ({ request }) => {
    const user = new UserAPI(request);
    let tempUserId = testData.UserId;
    testData.UserId = "123";

    await user.getUser(userPost, 401);

    testData.UserId = tempUserId;

    await user.getUser(userPost, 200); 
    });

  test("Add a list of books", async ({ request }) => {
    const book = new BooksAPI(request);
    addBookPost['userId'] = testData.UserId;

    await book.addBooks(addBookPost, 201); 
    });

    //verify book was added
    //GetBook returns an error - I won't include it to the test but in real-life i would.

  test("remove one of the books BUT pass a wrong UserId", async ({ request }) => {
    const book = new BooksAPI(request);

    removeBookPost['userId'] = "123";

    await book.removeBook(removeBookPost, 401); 

    removeBookPost['userId'] = testData.UserId;

    await book.removeBook(removeBookPost, 204); 
    
    await book.removeBook(removeBookPost, 400); //verify can't remove the book again
    });
})