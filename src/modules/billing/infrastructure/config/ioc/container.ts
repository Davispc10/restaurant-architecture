import { GeneratePaymentSlipsAndSaveBookletUseCase } from '$modules/billing/application/usecase/GeneratePaymentSlipsAndSaveBookletUseCase';
import { GetPaymentSlipBookletUseCase } from '$modules/billing/application/usecase/GetPaymentSlipBookletUseCase';
import { GetPaymentSlipsUseCase } from '$modules/billing/application/usecase/GetPaymentSlipsUseCase';
import { SavePaymentInformationUseCase } from '$modules/billing/application/usecase/SavePaymentInformationUseCase';
import { PaymentSlipBookletRepositoryGateway } from '$modules/billing/infrastructure/persistence/PaymentSlipBookletRepositoryGateway';
import { SequelizePaymentSlipRepository } from '$modules/billing/infrastructure/persistence/sequelize/SequelizePaymentSlipRepository';

import ErrorLogger from '$services/ErrorLogger';
import { container } from 'tsyringe';
import { GeneratePaymentSlipsAndSaveBookletController } from '../../web/express/controller/GeneratePaymentSlipsAndSaveBookletController';
import { GetPaymentSlipBookletController } from '../../web/express/controller/GetPaymentSlipBookletController';
import { GetPaymentSlipsController } from '../../web/express/controller/GetPaymentSlipsController';

// Application Output Ports
container.register('PaymentSlipRepository', {
  useValue: new SequelizePaymentSlipRepository()
});

container.register('PaymentSlipBookletRepository', {
  useValue: new PaymentSlipBookletRepositoryGateway(
    container.resolve('DocumentsRepository'),
    ErrorLogger
  )
});

// Application Input Ports
container.register('GetPaymentSlipsInputPort', {
  useValue: new GetPaymentSlipsUseCase(container.resolve('PaymentSlipRepository'))
});

container.register('GetPaymentSlipBookletInputPort', {
  useValue: new GetPaymentSlipBookletUseCase(
    container.resolve('PaymentSlipBookletRepository'),
    container.resolve('FileStorageService')
  )
});

container.register('GeneratePaymentSlipsAndSaveBookletInputPort', {
  useValue: new GeneratePaymentSlipsAndSaveBookletUseCase(
    container.resolve('ServerlessAPI'),
    container.resolve('BankLoanConfigurationRepository'),
    container.resolve('ProposalsRepository'),
    container.resolve('UsersRepository')
  )
});

container.register('SavePaymentInformationInputPort', {
  useValue: new SavePaymentInformationUseCase(
    container.resolve('PaymentSlipRepository'),
    container.resolve('DocumentTypesRepository'),
    container.resolve('DocumentsRepository'),
    container.resolve('DocumentsProposalRepository')
  )
});

// Controllers
container.register('GeneratePaymentSlipsAndSaveBookletController', {
  useValue: new GeneratePaymentSlipsAndSaveBookletController(
    container.resolve('GeneratePaymentSlipsAndSaveBookletInputPort')
  )
});

container.register('GetPaymentSlipBookletController', {
  useValue: new GetPaymentSlipBookletController(container.resolve('GetPaymentSlipBookletInputPort'))
});

container.register('GetPaymentSlipsController', {
  useValue: new GetPaymentSlipsController(container.resolve('GetPaymentSlipsInputPort'))
});
