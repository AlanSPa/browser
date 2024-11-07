

const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 




//ACESSO A TELA ATEURG
export async function acessarATEURG(page) {

  await page.screenshot({ path: `consultanaATEURG/loginIT${__ITER}-VU${__VU}.png` });

  const menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();
  let AcessoTela = page.locator('//a[@title="Atendimento"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Urgência e Emergência"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//div[@class="menu-submenu menu-open"]/ul/li/a[@title="Atendimento"]');
  await AcessoTela.click();
  await page.waitForTimeout(4000);
  await AcessoTela.click();
  AcessoTela = page.locator('//div[@id="dspTpAtendimento"]');
  await AcessoTela.isVisible();
  await page.waitForTimeout(50000);

  await page.screenshot({ path: `consultanaATEURG/telaIT${__ITER}-VU${__VU}.png` });
}


//CONSULTA PACIENTE ATRAVES DA ATEURG
export async function consultaPaciente(page, targetFrame, paciente, nomeMae) {

  await page.waitForTimeout(4000);
  let InputPac = targetFrame.locator('//input[@id="inp:primeiroNome"]')

  await InputPac.click();
  await page.waitForTimeout(1000);
  await InputPac.type(paciente); 
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `consultanaATEURG/consultaIT${__ITER}-VU${__VU}.png` });
  
  let BtConsulta = targetFrame.locator('//button[@id="btnPesquisar"]')
  await BtConsulta.click();
  await targetFrame.waitForSelector(`//div[@data-member="NM_MAE"][@title="${nomeMae}"]`);
  let NmMae = targetFrame.locator(`//div[@data-member="NM_MAE"][@title="${nomeMae}"]`);
  await NmMae.isVisible();
  await page.screenshot({ path: `consultanaATEURG/consultadoIT${__ITER}-VU${__VU}.png` });
}