# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2019-02-27 23:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_auto_20180525_1557'),
    ]

    operations = [
        migrations.AddField(
            model_name='carouselimage',
            name='is_visible',
            field=models.BooleanField(default=True),
        ),
    ]