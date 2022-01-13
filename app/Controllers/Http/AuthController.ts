import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema , rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async showRegister ({view}:HttpContextContract){
    return view.render('auth/register')
  }

  public async register ({request, response, auth}:HttpContextContract){
    const validationShema = schema.create({
      username : schema.string({trim : true},[
        rules.unique({table: 'users' , column: 'username'}),
        rules.minLength(3),
        rules.maxLength(50),
      ]),
      email:  schema.string({trim : true},[
        rules.email(),
        rules.maxLength(255),
        rules.unique({table: 'users' , column: 'email'}),
      ]),
      password: schema.string({trim : true},[
        //rules.confirmed(),
        rules.minLength(4),
      ]),
    })

    const validateData = await request.validate({
      schema: validationShema,
    })

    const user = await User.create(validateData)

    await auth.login(user)
    console.log(user)
    return response.redirect('/')
  }

  public async showLogin ({view}: HttpContextContract){
    return view.render('auth/login')
  }

  public async login ({request, response, auth , session}: HttpContextContract){
    const {email , password} = request.all()

    try {
      await auth.attempt(email, password)

      return response.redirect('/')
    } catch (error) {
      session.flash('notification', 'We couldnt verify your email or password')

      return response.redirect('back')
    }
  }

  public async logout ({ auth, response}:HttpContextContract){
    await auth.logout()

    return response.redirect('/')
  }
}
