{
    'name': 'Calendar - Everybody\'s Calendar Filter',
    'version': '19.0.1.0.0',
    'summary': 'Restores the "Everybody\'s calendars" filter in the Calendar app',
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