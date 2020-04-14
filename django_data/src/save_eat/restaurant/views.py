from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from . import forms
from django.http import Http404
from .models import Restaurant
import json
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from .models import Restaurant
from django.contrib.auth.decorators import login_required




# 後ですべてクラスベースビューに変更
class RestaurantUpdate(UpdateView):
    template_name = 'restaurant/edit.html'
    model = Restaurant
    fields = ['comment', 'benefits', 'phot']
    pk_url_kwarg = 'id'
    context_object_name = 'post'

    def form_valid(self, form):
        post = form.save(commit=False)
        if post.user.id == self.request.user.id:
            post.updated_by = self.request.user
            post.save()
            return render(self.request, 'restaurant/edit_compleate.html')
        else:
            return render(self.request, 'restaurant/index.html')


def IndexView(request):
    return render(request, 'restaurant/index.html')


def SerchView(request):
    return render(request, 'restaurant/search.html')

def PrivacyPolicyView(request):
    return render(request, 'policy/privacy.html')


def UserPolicyView(request):
    return render(request, 'policy/user.html')


@login_required(login_url='/accounts/signup/')
def HistoryView(request):
    return render(request, 'restaurant/history.html')


@login_required(login_url='/accounts/signup/')
def EditView(request):
    return render(request, 'restaurant/edit.html')


def RestaurantDetailView(request, restaurant_id):
    try:
        data = Restaurant.objects.filter(pk=restaurant_id).first()
    except Restaurant.DoesNotExist:
        raise Http404("存在しないデータです。")
    return render(request, 'restaurant/detail.html', {'data': restaurant_id})


@login_required(login_url='/accounts/signup/')
def RegisterView(request):
    form = forms.RestaurantForm()
    d = {
        'form': form,
    }

    if request.method == "POST":
        form = forms.RestaurantForm(request.POST, request.FILES)
        d['form'] = form
        if form.is_valid():
            try:
                post = form.save(commit=False)
                post.user = request.user
                form = post.save()
                pass
            except:
                return render(request, 'restaurant/register.html')
                pass
        else:
            return render(request, 'restaurant/register.html', d)

        return render(request, 'restaurant/register_compleate.html')

    else:
        form = forms.RestaurantForm()
        return render(request, 'restaurant/register.html', d)

    return render(request, 'restaurant/register.html', d)


# def detail_view(request, id):
#     # dictionary for initial data with
#     # field names as keys
#     context = {}

#     # add the dictionary during initialization
#     context["data"] = GeeksModel.objects.get(id=id)

#     return render(request, "detail_view.html", context)

# # update view for details


# def update_view(request, id):
#     # dictionary for initial data with
#     # field names as keys
#     context = {}

#     # fetch the object related to passed id
#     obj = get_object_or_404(GeeksModel, id=id)

#     # pass the object as instance in form
#     form = GeeksForm(request.POST or None, instance=obj)

#     # save the data from the form and
#     # redirect to detail_view
#     if form.is_valid():
#         form.save()
#         return HttpResponseRedirect("/"+id)

#     # add form dictionary to context
#     context["form"] = form

#     return render(request, "update_view.html", context)
