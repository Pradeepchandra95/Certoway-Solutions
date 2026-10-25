{
    'name': 'Calendar - Everybody\'s Calendar Filter',
    'version': '19.0.1.0.0',
    'summary': 'Restores the "Everybody\'s calendars" filter in the Calendar app',
    # Pricing configuration for the App Store listing
    'price': 49.00,           # Set your desired price in Euros
    'currency': 'EUR',        # Odoo App Store default currency
    'license': 'OPL-1',       # Odoo Proprietary License v1 is required for paid apps
    'category': 'Productivity/Calendar',
    'depends': ['calendar', 'web'],
    'assets': {
        'web.assets_backend': [
            'calendar_everybody_filter/static/src/calendar_all_filter_patch.js',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
