export const guideSlugs = ['mac-temperature', 'mac-fan-control', 'macbook-charge-limit'] as const;
export type GuideSlug = typeof guideSlugs[number];
type Guide = { title: string; description: string; sections: { title: string; body: string }[] };
export const guides: Record<'ru' | 'pt', Record<GuideSlug, Guide>> = {
  ru: {
    'mac-temperature': {
      title: 'Как посмотреть температуру Mac в Kelvin',
      description: 'Температура CPU и GPU на Mac, нагрузка и энергопотребление в одной панели Kelvin. Узнайте, какие показатели доступны и как читать данные датчиков.',
      sections: [
        { title: 'Температура рядом с нагрузкой', body: 'Откройте панель Kelvin и раздел с показателями железа. Здесь можно следить за доступными температурными датчиками, нагрузкой и энергопотреблением компонентов. Смотрите на несколько показателей вместе: температура при сборке проекта или рендере относится к другому сценарию, чем температура простаивающего Mac.' },
        { title: 'Какие датчики видны на вашем Mac', body: 'Набор датчиков зависит от модели Mac, версии macOS и доступных системных механизмов. Показатели CPU, GPU и других компонентов отображаются там, где система предоставляет данные. Отсутствующее значение не означает нулевую температуру. Kelvin работает на Intel и Apple Silicon, но набор метрик на них может различаться.' },
        { title: 'От показателя к действию', body: 'Сопоставьте рост температуры с нагрузкой приложений и показателями питания. Если ваш Mac поддерживает управление вентиляторами, Kelvin позволяет перейти от наблюдения к профилю охлаждения. Не существует одного универсального температурного порога для всех Mac и всех датчиков: учитывайте модель и характер задачи.' },
        { title: 'Мониторинг без аккаунта', body: 'Kelvin читает показатели локально на Mac. Для мониторинга не нужны аккаунт, подписка или ключ. Интерактивная панель на сайте показывает пример данных; реальные показатели вашего компьютера доступны после установки приложения для macOS 11 или новее.' },
      ],
    },
    'mac-fan-control': {
      title: 'Управление вентиляторами Mac в Kelvin',
      description: 'Автоматический режим, фиксированные RPM и кривые по датчику в Kelvin. Бесплатное управление охлаждением на Mac с поддерживаемыми вентиляторами.',
      sections: [
        { title: 'Сначала проверьте совместимость', body: 'Управление охлаждением доступно на Mac с поддерживаемыми вентиляторами. Если в модели нет вентилятора, программное управление оборотами невозможно. Наличие Apple Silicon или Intel само по себе не гарантирует одинаковые возможности: Kelvin учитывает конкретное оборудование.' },
        { title: 'Три способа управления', body: 'Автоматический режим оставляет управление оборотами системе. Режим фиксированных RPM задаёт постоянную скорость на поддерживаемом оборудовании. Кривая по сенсору связывает обороты с показаниями выбранного температурного датчика. Выбирайте режим в зависимости от задачи и следите за температурой после изменения настроек.' },
        { title: 'Разрешения и применение настроек', body: 'Для изменения системных параметров может потребоваться установка системного сервиса Kelvin и подтверждение администратора. Проверяйте статус сервиса и фактические обороты после выбора профиля. Если управление недоступно, не считайте выбранное значение подтверждением того, что вентиляторы уже изменили скорость.' },
        { title: 'Бесплатно, вместе с мониторингом', body: 'Профили охлаждения доступны без подписки и пробного периода. В той же панели можно наблюдать за нагрузкой, температурой и энергией. Kelvin не заменяет исправное охлаждение: если нагрев связан с аппаратной неисправностью, настройка профиля не устраняет её причину.' },
      ],
    },
    'macbook-charge-limit': {
      title: 'Лимит заряда батареи MacBook в Kelvin',
      description: 'Контролируйте заряд MacBook и наблюдайте за ёмкостью, циклами и температурой батареи. Лимит заряда в бесплатной панели Kelvin для совместимых моделей.',
      sections: [
        { title: 'Заряд и состояние батареи в одном месте', body: 'Kelvin показывает доступные показатели батареи: процент заряда, ёмкость, циклы, температуру и напряжение. График питания помогает увидеть, как меняется потребление. Доступность отдельных значений зависит от модели MacBook и данных, которые предоставляет система.' },
        { title: 'Когда полезен лимит заряда', body: 'Если MacBook часто работает от адаптера, лимит позволяет выбрать, до какого уровня заряжать батарею на совместимом оборудовании. Например, можно использовать профиль с пределом 80%. Это настройка сценария питания, а не обещание определённого срока службы или восстановления уже изношенной батареи.' },
        { title: 'Проверьте применение лимита', body: 'Откройте настройки батареи в Kelvin, выберите доступный предел и проверьте состояние системного сервиса. Для управления зарядкой могут понадобиться права администратора. После применения наблюдайте за статусом питания и зарядом: доступность управления определяется конкретной моделью MacBook.' },
        { title: 'Перед работой без розетки', body: 'Проверьте установленный лимит и при необходимости измените его перед поездкой или долгой работой без адаптера. Мониторинг и управление батареей входят в бесплатную версию Kelvin. Не требуются регистрация, подписка или активационный ключ.' },
      ],
    },
  },
  pt: {
    'mac-temperature': {
      title: 'Como ver a temperatura do Mac com o Kelvin',
      description: 'Veja temperatura da CPU e GPU, carga e energia no painel Kelvin. Entenda os sensores disponíveis e acompanhe o hardware do seu Mac.',
      sections: [
        { title: 'Temperatura junto com a carga', body: 'Abra o painel Kelvin e a seção de hardware. Acompanhe os sensores de temperatura disponíveis, a carga e o consumo dos componentes. Compare as métricas: a temperatura durante uma compilação ou renderização corresponde a um cenário diferente da temperatura de um Mac ocioso.' },
        { title: 'Sensores disponíveis no seu Mac', body: 'Os sensores dependem do modelo, da versão do macOS e dos mecanismos disponíveis no sistema. Dados da CPU, GPU e de outros componentes aparecem quando o sistema os fornece. Um valor ausente não significa temperatura zero. O Kelvin funciona em Intel e Apple Silicon, mas as métricas podem variar.' },
        { title: 'Da leitura à ação', body: 'Compare a elevação da temperatura com a carga dos aplicativos e as métricas de energia. Se o Mac for compatível com controle de ventoinhas, escolha um perfil de resfriamento. Não há um único limite de temperatura válido para todos os Macs e sensores: considere o modelo e a tarefa.' },
        { title: 'Monitoramento sem conta', body: 'O Kelvin lê as métricas localmente no Mac. Não exige conta, assinatura ou chave. O painel interativo do site usa dados de exemplo; as métricas reais do computador ficam disponíveis depois de instalar o aplicativo para macOS 11 ou posterior.' },
      ],
    },
    'mac-fan-control': {
      title: 'Controle de ventoinhas do Mac com o Kelvin',
      description: 'Modo automático, RPM fixo e curvas por sensor no Kelvin. Controle gratuito de resfriamento em Macs com ventoinhas compatíveis.',
      sections: [
        { title: 'Confira a compatibilidade primeiro', body: 'O controle está disponível em Macs com ventoinhas compatíveis. Em um modelo sem ventoinha, não é possível controlar a rotação por software. Ter Intel ou Apple Silicon não garante os mesmos controles: as possibilidades dependem do equipamento específico.' },
        { title: 'Três modos de controle', body: 'O modo automático deixa o sistema gerenciar a rotação. O modo de RPM fixo define uma velocidade constante em equipamentos compatíveis. A curva por sensor relaciona a rotação à temperatura de um sensor escolhido. Selecione o modo conforme a tarefa e acompanhe a temperatura depois de alterar os ajustes.' },
        { title: 'Permissões e aplicação dos ajustes', body: 'Alterar parâmetros do sistema pode exigir o serviço do Kelvin e autorização de administrador. Confira o estado do serviço e a rotação real depois de escolher um perfil. Se o controle estiver indisponível, selecionar um valor não confirma que a velocidade da ventoinha mudou.' },
        { title: 'Grátis, junto com o monitoramento', body: 'Os perfis não exigem assinatura ou período de teste. No mesmo painel você acompanha carga, temperatura e energia. O Kelvin não substitui um sistema de resfriamento em boas condições: um perfil não resolve a causa de uma falha física.' },
      ],
    },
    'macbook-charge-limit': {
      title: 'Limite de carga da bateria do MacBook com o Kelvin',
      description: 'Acompanhe carga, capacidade, ciclos e temperatura da bateria. Defina um limite de carga no Kelvin gratuito para modelos de MacBook compatíveis.',
      sections: [
        { title: 'Carga e estado da bateria no mesmo lugar', body: 'O Kelvin mostra as métricas disponíveis da bateria: porcentagem, capacidade, ciclos, temperatura e tensão. O gráfico de energia ajuda a acompanhar mudanças no consumo. Alguns valores dependem do modelo do MacBook e dos dados fornecidos pelo sistema.' },
        { title: 'Quando usar um limite', body: 'Se o MacBook costuma ficar conectado ao adaptador, o limite permite escolher até que nível carregar em equipamentos compatíveis. Por exemplo, você pode usar um perfil com limite de 80%. É um ajuste de uso, não uma promessa de duração da bateria ou de recuperação de uma bateria desgastada.' },
        { title: 'Confira se o limite foi aplicado', body: 'Abra os ajustes de bateria no Kelvin, escolha um limite disponível e confira o serviço do sistema. O controle pode exigir autorização de administrador. Depois, observe o estado de energia e a carga: a disponibilidade do controle depende do modelo específico do MacBook.' },
        { title: 'Antes de trabalhar longe da tomada', body: 'Confira o limite e ajuste-o se necessário antes de uma viagem ou de um período longo sem adaptador. Monitoramento e controle de bateria fazem parte do Kelvin gratuito, sem cadastro, assinatura ou chave de ativação.' },
      ],
    },
  },
};
