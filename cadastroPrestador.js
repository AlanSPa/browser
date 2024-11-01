import { browser } from 'k6/browser';
import { Url, login , nomeVariavel, options, SalvarTela, numeroaleatorio, gerarCPF, gerarRG, primeiroNomeVariavel, PageConfs, Iframe } from './funcoes/genericas.js'; 
import { acessarCAD_PRE, cadastraPrestador, cadastraComplemento, gruposProibidos, cadastraContato, cadastraVinculo, cadastraEspecialidade, cadastraArea, cadastraCredenciamento, origensProibidas, referencia, cadPreferencia, cadInstituicao, cadAgenda} from './funcoes/cadastraPrestadorFuncoes.js'; 


export { options };

export async function browserTest() {

  const { page } = await PageConfs();

  //TESTE
  try {

    await page.goto(Url.baseUrl);
    await login(page);
    
    await acessarCAD_PRE(page);
    const { targetFrame } = await Iframe(page);

    //await cadastroPrimario(page, nomeVariavel(), nomeVariavel(), gerarCPF(), '37')
    await cadastraPrestador(page, targetFrame, nomeVariavel(), nomeVariavel(), nomeVariavel(), '01/01/1990', 'Masculino', 'Branca', gerarCPF(), gerarRG(), 'SSP-SP', 'SP', '01/01/2000');
    await cadastraComplemento(page, targetFrame, '37', '4002', '1', primeiroNomeVariavel(), numeroaleatorio());
    await cadastraContato(page, targetFrame, '7', primeiroNomeVariavel());
    await cadastraVinculo(page, targetFrame, '5');
    await cadastraEspecialidade(page, targetFrame, '20', '8');
    await cadastraArea(page, targetFrame, '5002');
    await cadastraCredenciamento(page, targetFrame, '1');
    await SalvarTela(page, targetFrame,'Registros gravados com sucesso');
    await gruposProibidos(page, targetFrame,);
    await origensProibidas(page, targetFrame,);
    await cadPreferencia(page, targetFrame, '5002', '5002');
    await referencia(page, targetFrame, '9', nomeVariavel());
    await cadInstituicao(page, targetFrame, '9', '01/12/2024', '10/01/2025');
    await cadAgenda(page, targetFrame, 'ABC', 'Descricao Teste de Agendamento para Prestador')
    await SalvarTela(page, targetFrame, 'Registros gravados com sucesso');

    

    await page.screenshot({ path: `CAD_PRE/concluidoIT${__ITER}-VU${__VU}.png` });
    

  } finally {
    await page.close();
  }
 
  }