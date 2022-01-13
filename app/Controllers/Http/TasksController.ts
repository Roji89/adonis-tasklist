import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema , rules} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index ({view, auth}:HttpContextContract){
    const user = auth.user
    await user?.preload('tasks')

    return view.render('tasks/index', {tasks: user?.tasks})
  }

  public async getone ({view, request , response, params}:HttpContextContract){
    const task = await Task.findOrFail(params.id)

    return view.render('tasks/task', {task})
  }
  public async store ({request , response, session, auth}: HttpContextContract){
    const validationSchma = schema.create({
      title: schema.string({ trim: true},[
        rules.minLength(3),
        rules.maxLength(50),
      ]),
    })

    const validateData = await request.validate({
      schema: validationSchma,
      messages:{
        'title.request': 'Enter the titl',
        'title.minLength': 'min title length is 3 character',
        'title.maxLength': 'max title length is 50 character',
      },
    })
    // const task =await Task.create({
    //   title : validateData.title,
    //   userId: auth.user?.id,
    // })

    await auth.user?.related('tasks').create({
      title : validateData.title,
    })
    session.flash('notification', 'Task added!')

    return response.redirect('back')
  }

  public async update ({request , response, session, params}: HttpContextContract){
    const task = await Task.findOrFail(params.id)

    task.completed = !!request.input('completed')
    await task.save()

    //session.flash('notification', 'Task is updated')

    return response.redirect('/')
  }
  public async updateone ({request , response, session, params}: HttpContextContract){
    const task = await Task.findOrFail(params.id)

    task.title = request.input('title')
    task.completed = !!request.input('completed')
    await task.save()

    //session.flash('notification', 'Task is updated')

    return response.redirect('/')
  }

  public async delete ({response, params , session}: HttpContextContract){
    const task = await Task.findOrFail(params.id)

    await task.delete()

    session.flash('notification', 'task deleted')

    return response.redirect('back')
  }
}
