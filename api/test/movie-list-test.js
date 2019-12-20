const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
 "positive" : {
    "getList" : "Get OMBD Movie List Correctly",
 },
 "negative" : {
    "nullSearch" : "When Search Key is null, get error message",
    "falseApiKey" : "When API Key is false, get error message",
    "nullApiKey" : "When API key is null, get error message",
    "titlenotfound" : "When title is not found, get error message"

 }
}

describe(`OMDB Movie List`, () => {
 const apiKey = 'ded58b9c';
 const apiKeyfalse = 'rizkiakbar';
 const keySearch = 'lord';
 const keyEmpty = '';
 const titlenotfound = 'aklfshlajksda sdajsdnlasmdn';

 it(`@get ${testCase.positive.getList}`, async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  console.log(response.body.Search[0].Title);
  assert(response.status).to.equal(200);
 }),

 it(`@get ${testCase.negative.nullSearch}`, async() => {
  const response = await page.getMovieList(apiKey, '');
  // console.log(response);
  assert(response.status).to.equal(200, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('Something went wrong.');
 }),

 it(`@get ${testCase.negative.falseApiKey}`, async() => {
   const response = await page.getMovieList(apiKeyfalse, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API key!');
  }),

it(`@get ${testCase.negative.nullApiKey}`, async() => {
   const response = await page.getMovieList(keyEmpty, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('No API key provided.');
  }),
it(`@get ${testCase.negative.titlenotfound}`, async() => {
   const response = await page.getMovieList(apiKey, titlenotfound);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Movie not found!');
   
  })	
}) 
