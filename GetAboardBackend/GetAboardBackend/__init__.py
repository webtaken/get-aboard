import os
import logging

logging.basicConfig(format='[%(asctime)s]: %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)

if os.getenv('ENV_MODE', 'development') == 'production':
    logger.info('Using production settings.')
    os.environ.setdefault(
        'DJANGO_SETTINGS_MODULE', 'GetAboardBackend.prod_settings'
    )
else:
    logger.info('Using development settings.')
    os.environ.setdefault(
        'DJANGO_SETTINGS_MODULE', 'GetAboardBackend.settings'
    )
