import { browser } from 'k6/browser';
import { Url, login , nomeVariavel, options, SalvarTela, numeroaleatorio, gerarCPF } from './funcoes/genericas.js'; 
import { acessarCAD_PAC, cadastraPaciente, cadastraEndereco} from './funcoes/cadastraPacienteFuncoes.js'; 



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

    await page.goto(Url.baseUrl);
    await login(page);
    

    await acessarCAD_PAC(page);
    
    await cadastraPaciente(page, nomeVariavel(), nomeVariavel(), '01/01/1990', 'Masculino', 'Branca', gerarCPF());

    await cadastraEndereco(page, 'RUA ' + nomeVariavel(), 'BAIRRO ' + nomeVariavel(), numeroaleatorio(), '888')

    await SalvarTela(page, 'Registros gravados com sucesso')
    
    await page.screenshot({ path: `cadastrapaciente/concluidoIT${__ITER}-VU${__VU}.png` });


    

  } finally {
    await page.close();
  }
 
  }