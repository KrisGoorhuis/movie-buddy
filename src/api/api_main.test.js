// const apiMain = require('./api_main.js');
import apiMain from './api_main.js'
import getSuggestableMovies from './api_main.js';

test('object assignment', () => {
   const data = {one: 1};
   data['two'] = 2;
   expect(data).toEqual({one: 1, two: 2});
 });

 test('two plus two is four', () => {
   expect(2 + 2).toBe(4);
 });

 test('returns something instead of nothing', () => {
   let movies = await getSuggestableMovies()
 })

 const mockCallback = jest.fn( () => {

 })

