import { browser } from 'k6/browser';
import { Url, login , options, PageConfs, Iframe } from './funcoes/genericas.js'; 
import { acessarATEURG, consultaPaciente } from './funcoes/consultanaATEURGFuncoes.js'; 


export { options };

export async function browserTest() {

  const { page } = await PageConfs();

  //TESTE
  try {

    await page.goto(Url.baseUrl);
    await login(page);
    
    await acessarATEURG(page);
    const { targetFrame } = await Iframe(page);

    await consultaPaciente(page, targetFrame, 'AARAO NOBREGA', 'PALMYRA NOBREGA');
    

  } finally {
    await page.close();
  }
 
  }