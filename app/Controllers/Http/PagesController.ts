import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async home ({ view }: HttpContextContract){
    return view.render('tasks/index')
  }
  public async routes ({view}){
    return view.render('routes')
  }
  public async about ({view, params}){
    const name = params.name
    return view.render('about', {name})
  }
}
