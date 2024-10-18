import { browser } from 'k6/browser';
import { Url, login , options } from './funcoes/genericas.js'; 
import { acessarATEURG, consultaPaciente } from './funcoes/consultanaATEURGFuncoes.js'; 


export { options };

export async function browserTest() {

  const context = await browser.newContext({
    locale: 'pt-BR',
  });
  const page = await context.newPage({
    locale: 'pt-BR',
  });
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'pt-BR',
  });

  //TESTE
  try {

    await page.goto(Url.baseUrl);
    await login(page);
    
    await acessarATEURG(page);

    await consultaPaciente(page, 'AARAO NOBREGA', 'PALMYRA NOBREGA');
    

  } finally {
    await page.close();
  }
 
  }