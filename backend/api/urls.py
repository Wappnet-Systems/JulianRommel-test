from django.urls import path
from .views import DocumentCreate, FileCreate, FileList, FileRetrieveUpdateDestroy, GetUserDetails, fileDownloadView, DocumentList
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('profile/', GetUserDetails.as_view()),
    path('documents/', DocumentList.as_view()),
    path('documents/upload/', DocumentCreate.as_view()),
    path('files/', FileList.as_view()),
    path('files/upload/', FileCreate.as_view()),
    path('files/download/<int:id>/', fileDownloadView),
    path('files/<int:id>/', FileRetrieveUpdateDestroy.as_view()),
    # path('token/', GetCSRFToken.as_view(), name='csrf_token'),
    # path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verification'),
]
