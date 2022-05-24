import os
from api.serializers import FileSerializer, DocumentSerializer
from django.contrib.auth import authenticate, login
from django.core.exceptions import PermissionDenied
from django.http.response import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import File, Document


# Create your views here.
class FileList(ListAPIView):

    def list(self, request):
        user = request.user
        queryset = File.objects.filter(client=user)
        serializer = FileSerializer(queryset, many=True)
        return Response(serializer.data)


class FileCreate(CreateAPIView):
    model = File
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FileSerializer

    def post(self, request, *args, **kwargs):

        # Only admins are allowed to upload files
        if not request.user.is_superuser:
            raise PermissionDenied()

        client = request.data.get('client')
        name = request.data.get('name')
        file = request.FILES['file']
        # user = get_user_model().objects.get(client=client)

        serializer = FileSerializer(data={'name': name, 'file': file, 'client': client, 'downloaded': False})
        if serializer.is_valid():
            validated_data = serializer.validated_data
            print(validated_data)
            serializer.create(validated_data)

        print(serializer.errors)

        return Response('meeep')


class FileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        file_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('file_data_{}'.format(file_id))

        return response


class GetUserDetails(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        return Response({'client': user.client, 'isAdmin': user.is_staff})


def fileDownloadView(request, id):
    file_object = File.objects.get(id=id)
    file_path = file_object.file.path
    file_object.downloaded = True
    file_object.save()
    # Check if user has permission !!!

    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response


class DocumentList(ListAPIView):
    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        queryset = Document.objects.all()
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)


class DocumentCreate(CreateAPIView):
    model = Document
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = DocumentSerializer

    def post(self, request, *args, **kwargs):

        # Only admins are allowed to upload Documents
        if not request.user.is_superuser:
            raise PermissionDenied()

        name = request.data.get('name')
        file = request.FILES['file']

        serializer = DocumentSerializer(data={'name': name, 'file': file})
        if serializer.is_valid():
            validated_data = serializer.validated_data
            serializer.create(validated_data)
            return Response('Upload successful')

        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Also obsolete because of JWT auth
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    # response = JsonResponse({'success': 'CSRF returned'})
    def get(self, request, format=None):
        return Response({'success': 'CSRF returned'}, status=status.HTTP_200_OK)


# Obsolete? Because of /api/token/
@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, foramt=None):
        data = self.request.data

        client = data['client']
        password = data['password']

        try:
            user = authenticate(client=client, password=password)

            if user is not None:
                login(request, user)
                return Response({'success': 'Logged in successfully', 'client': client})
            else:
                return Response({'error': 'Error while authenticating'})

        except:
            return Response({'error': 'Something went wrong when logging in'})
