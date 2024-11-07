import { browser } from 'k6/browser';
import { Url, login , nomeVariavel, options, SalvarTela, numeroaleatorio, gerarCPF, PageConfs, Iframe } from './funcoes/genericas.js'; 
import { acessarCAD_PAC, cadastraPaciente, cadastraEndereco} from './funcoes/cadastraPacienteFuncoes.js'; 



export { options };

export async function browserTest() {

  const { page } = await PageConfs();

  try {

    await page.goto(Url.baseUrl);
    await login(page);
    

    await acessarCAD_PAC(page);
    const { targetFrame } = await Iframe(page);
    
    await cadastraPaciente(page, targetFrame, nomeVariavel(), nomeVariavel(), '01/01/1990', 'Masculino', 'Branca', gerarCPF());

    await cadastraEndereco(page, targetFrame,  'RUA ' + nomeVariavel(), 'BAIRRO ' + nomeVariavel(), numeroaleatorio(), '888')

    await SalvarTela(page, targetFrame,'Registros gravados com sucesso');
    
    await page.screenshot({ path: `cadastrapaciente/concluidoIT${__ITER}-VU${__VU}.png` });


    

  } finally {
    await page.close();
  }
 
  }