import handlebars from 'handlebars'
import fs from 'fs'

import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const contentFileTemplate = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })
    const parseTemplate = handlebars.compile(contentFileTemplate)

    return parseTemplate(variables)
  }
}
