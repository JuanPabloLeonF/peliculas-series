from rest_framework import serializers
from .models import Series, Seasons, Videos

class VideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = '__all__'
        read_only_fields = ('id',)

class SeasonsSerializer(serializers.ModelSerializer):
    videos = VideosSerializer(many=True, read_only=True)

    class Meta:
        model = Seasons
        fields = '__all__'
        read_only_fields = ('id',)

class SeriesSerializer(serializers.ModelSerializer):
    seasons = SeasonsSerializer(many=True, read_only=True)

    class Meta:
        model = Series
        fields = '__all__'
        read_only_fields = ('id',)
