from django.conf import settings
from allauth.account.adapter import DefaultAccountAdapter


class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        context['activate_url'] = settings.URL_FRONT + \
            'verify-email/' + context['key']
        msg = self.render_mail(template_prefix, email, context)
        msg.send()
