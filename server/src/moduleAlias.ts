import 'module-alias/register'
import moduleAlias from 'module-alias'

function setupModuleAliases(): void {
  moduleAlias.addAliases({
    '@configs': __dirname + '/configs',
    '@routes': __dirname + '/routes',
    '@interfaces': './../shared/interfacess',
    '@middlewares': __dirname + '/middlewares',
    '@services': __dirname + '/services',
    '@auth': __dirname + '/auth',
    '@utils': __dirname + '/utils'
  })
}

export default setupModuleAliases
