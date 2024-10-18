

const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 




//ACESSO A TELA M_SOLSAIPRO
export async function acessarM_SOLSAIPRO(page) {
  await page.screenshot({ path: `atendepedido/loginIT${__ITER}-VU${__VU}.png` });

  let menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();
  let AcessoTela = page.locator('//a[@title="Materiais e Logística"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Almoxarifado"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Solicitações"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Produtos ao Estoque"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//button[@id="rb_TpSolsaiPro_Paciente_btn"]');
  await AcessoTela.isVisible();
  await page.waitForTimeout(50000);

  await page.screenshot({ path: `atendepedido/telaIT${__ITER}-VU${__VU}.png` });
}

//REALIZA PEDIDO
export async function realizaPedido(page, estoque, setor, produto, quantidade) {
 
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

  let botaoDestino = targetFrame.locator('//button[@id="rb_TpSolsaiPro_Setor_btn"]')
  await botaoDestino.click();

  //PREENCHE ESTOQUE
  await page.waitForTimeout(4000);
  let InputCampo = targetFrame.locator('//input[@id="inp:cdEstoque"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);
  await InputCampo.fill(estoque);
  await page.waitForTimeout(1000);

  //PREENCHE SETOR
  await page.waitForTimeout(4000);
  InputCampo = targetFrame.locator('//input[@id="inp:cdSetor"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);
  await InputCampo.fill(setor);   
  await page.waitForTimeout(1000);

  //PREENCHE PRODUTO
  await page.waitForTimeout(4000);
  InputCampo = targetFrame.locator('//div[@class="slick-cell b0 f0 selected ui-fixed-width"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);
  InputCampo = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@class="ui-widget-content ui-buttoninput ui-corner-left"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);
  await InputCampo.fill(produto);
  await page.screenshot({ path: `atendepedido/pedidopIT${__ITER}-VU${__VU}.png` });

  InputCampo = targetFrame.locator('//div[@class="slick-cell b3 f3 selected ui-fixed-width"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);  
  InputCampo = targetFrame.locator('//input[@class="editor-text mode-edit"]')
  await InputCampo.click();
  await page.waitForTimeout(1000);
  await InputCampo.fill(quantidade);

  
  

  await page.screenshot({ path: `atendepedido/pedidoIT${__ITER}-VU${__VU}.png` });

  
}

export async function SalvarTelaSemLimpar(page, msgesperada) {
  
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

  const BtSalvar = targetFrame.locator('//li/a[@data-action="SAVE"]');
  await BtSalvar.click();
  await page.waitForTimeout(3000);

  const notificationElement = await targetFrame.locator('//div[@class="notifications-item-body notification-item-no-title"]/p');
  if (notificationElement) {
      const notificationText = await notificationElement.textContent();
      if (notificationText.includes(msgesperada)) {
          console.log('Mensagem de sucesso encontrada!');
      } else {
          console.log('Mensagem de sucesso não encontrada ou texto incorreto.');
      }
  } else {
      console.log('Elemento de notificação não encontrado.');
  }

  const BtNao = await targetFrame.locator('//button[contains(text(), "Não")]');
  await page.waitForTimeout(3000);
  await BtNao.click();
  await page.waitForTimeout(3000);
  await BtNao.click();
  await page.waitForTimeout(3000);

  await page.screenshot({ path: `atendepedido/salvoIT${__ITER}-VU${__VU}.png` });

}

//ATENDER PEDIDO
export async function atendePedido(page) {
  
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

  let InputCampo = await targetFrame.locator('//input[@id="inp:cdSolsaiPro"]');
  let codSolicitacao = await InputCampo.getAttribute('title');
  console.log('Solicitacao salva: ', codSolicitacao);

  let BtSair = targetFrame.locator('//li/a[@data-action="EXIT"]');
  await BtSair.click();
  await page.waitForTimeout(3000);

  await page.screenshot({ path: `atendepedido/NovaTelaIT${__ITER}-VU${__VU}.png` });

  let menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();
  AcessoTela = page.locator('//a[@title="Atender"]');
  await AcessoTela.click();

  InputCampo = await targetFrame.locator('//input[@class="editor-text mode-search"]'); 
  await InputCampo.click();
  await page.waitForTimeout(1000);
  await InputCampo.fill(codSolicitacao);

  let BtPesquisa = await targetFrame.locator('//li/a[@data-action="EXECUTE_QUERY"]');
  await BtPesquisa.click();
  await page.waitForTimeout(1000);

  let BtConfirma = await targetFrame.locator('//button[@id="btnConfirmaProdutos"]');
  await BtConfirma.click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: `atendepedido/SolicitadoIT${__ITER}-VU${__VU}.png` });

  


}





