/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'TasksController.index')
Route.post('/tasks','TasksController.store')
Route.post('/tasks/:id','TasksController.update')
Route.get('/task/:id','TasksController.getone')
Route.post('/task/:id','TasksController.updateone')
Route.delete('/tasks/:id/delete', 'TasksController.delete')

// Route.get('/routes', 'PagesController.routes').as('routes')
// Route.get('/about/:name?', 'PagesController.about')

// Route.get('/', async ({ view }) => {
//   return view.render('welcome')
// })

// Route.get('/routes', async () => {
//   return 'here we have all the routes'
// })
// Route.get('/about/:name?', async ({ params }) => {
//   return params.name? `welcome ${params.name} to adonis page`:'thsi is adonis page'
// })
