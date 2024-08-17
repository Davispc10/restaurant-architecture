import { container } from 'tsyringe';
import { sharedCommonHttpErrorMapping } from '../../moduleErrorHandler/SharedCommonHttpErrorMapping';

container.register('SharedCommonHttpErrorMapping', { useValue: sharedCommonHttpErrorMapping });
