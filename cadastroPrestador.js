import { browser } from 'k6/browser';
import { Url, login , nomeVariavel, options, SalvarTela, numeroaleatorio, gerarCPF, gerarRG, primeiroNomeVariavel } from './funcoes/genericas.js'; 
import { acessarCAD_PRE, cadastraPrestador, cadastraComplemento, gruposProibidos, cadastraContato, cadastraVinculo, cadastraEspecialidade, cadastraArea, cadastraCredenciamento, origensProibidas, referencia, cadPreferencia, cadInstituicao, cadAgenda} from './funcoes/cadastraPrestadorFuncoes.js'; 


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
    
    await acessarCAD_PRE(page);

    //await cadastroPrimario(page, nomeVariavel(), nomeVariavel(), gerarCPF(), '37')
    await cadastraPrestador(page, nomeVariavel(), nomeVariavel(), nomeVariavel(), '01/01/1990', 'Masculino', 'Branca', gerarCPF(), gerarRG(), 'SSP-SP', 'SP', '01/01/2000');
    await cadastraComplemento(page, '37', '4002', '1', primeiroNomeVariavel(), numeroaleatorio());
    await cadastraContato(page, '7', primeiroNomeVariavel());
    await cadastraVinculo(page, '5');
    await cadastraEspecialidade(page, '20', '8');
    await cadastraArea(page, '5002');
    await cadastraCredenciamento(page, '1');
    await SalvarTela(page, 'Registros gravados com sucesso');
    await gruposProibidos(page);
    await origensProibidas(page);
    await cadPreferencia(page, '5002', '5002');
    await referencia(page, '9', nomeVariavel());
    await cadInstituicao(page, '9', '01/12/2024', '10/01/2025');
    await cadAgenda(page, 'ABC', 'Descricao Teste de Agendamento para Prestador')
    await SalvarTela(page, 'Registros gravados com sucesso');

    

    await page.screenshot({ path: `CAD_PRE/concluidoIT${__ITER}-VU${__VU}.png` });
    

  } finally {
    await page.close();
  }
 
  }