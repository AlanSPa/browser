import { browser } from 'k6/browser';
import { login , acessarCAD_PAC, cadastraPaciente, nomeVariavel, options, SalvarTela, cadastraEndereco, numeroaleatorio } from './funcoes/genericas.js'; 



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
    await page.waitForTimeout(10000);
    await page.screenshot({ path: `cadastrapaciente/antes.png` });
    await login(page);
    await page.screenshot({ path: `cadastrapaciente/login.png` });
    await acessarCAD_PAC(page);
    await page.screenshot({ path: `cadastrapaciente/tela.png` });
    await cadastraPaciente(page, nomeVariavel(), nomeVariavel(), '01/01/1990', 'Masculino', 'Branca');
    await page.screenshot({ path: `cadastrapaciente/cadastro.png` });
    await cadastraEndereco(page, 'RUA ' + nomeVariavel(), 'BAIRRO ' + nomeVariavel(), numeroaleatorio(), '888')
    await page.screenshot({ path: `cadastrapaciente/cadastroendereco.png` });
    await SalvarTela(page, 'Registros gravados com sucesso')
    await page.screenshot({ path: `cadastrapaciente/final.png` });
    await page.waitForTimeout(20000);


    

  } finally {
    await page.close();
  }
 
  }