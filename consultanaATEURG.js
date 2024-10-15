import { browser } from 'k6/browser';
import { login , acessarATEURG, consultaPaciente, options } from './funcoes/genericas.js'; 



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

  try {

    await page.goto('https://1801tst1.cloudmv.com.br/soul-mv/');
    await login(page);
    await page.screenshot({ path: `consultanaATEURG/login.png` });
    await acessarATEURG(page);
    await page.screenshot({ path: `consultanaATEURG/tela.png` });
    await consultaPaciente(page, 'AARAO NOBREGA', 'PALMYRA NOBREGA');
    await page.screenshot({ path: `consultanaATEURG/consultado.png` });
    await page.waitForTimeout(20000);


    

  } finally {
    await page.close();
  }
 
  }