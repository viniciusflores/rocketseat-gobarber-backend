import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

export default class FakeEmailTemplateProvider
  implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content'
  }
}
