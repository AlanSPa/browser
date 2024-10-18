import { browser } from 'k6/browser';
import { Url ,login , options } from './funcoes/genericas.js'; 
import { acessarM_SOLSAIPRO, realizaPedido, SalvarTelaSemLimpar, atendePedido } from './funcoes/atendePedidoFuncoes.js'; 


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
    await page.waitForTimeout(10000);
    

    await login(page);

    await acessarM_SOLSAIPRO(page);
    await realizaPedido(page, '198', '842', '23067', '1')
    await SalvarTelaSemLimpar(page, 'Registros gravados com sucesso')
    await atendePedido(page);
    
    await page.waitForTimeout(20000);
    

  } finally {
    await page.close();
  }
 
  }