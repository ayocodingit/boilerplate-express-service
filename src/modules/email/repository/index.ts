import nodemailer from 'nodemailer'
import config from '../../../config'
import { Email as Entity } from '../entity'

const transporter = nodemailer.createTransport({
  host: config.get('smtp.host'),
  port: Number(config.get('smtp.port')),
  secure: false,
  auth: {
    user: config.get('mail.username'),
    pass: config.get('mail.password')
  }
})
export namespace Email {
  export const sendMail = (mailOptions: Entity.Payload): void => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err
      console.log('Email sent: ' + info.response)
    })
  }
}
