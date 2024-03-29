from django.db import models

# Create your models here.
class Product(models.Model):
    """
    Таблица, содержащая товар: 
    - id товара;
    - Количество
    - цена
    - Название товара
    - Описание 
    """
    product_id = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    price = models.FloatField(default=0)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Users(models.Model):
    """
    Таблица, содержащая данные о пользователях:
    - Адрес кошелька;
    - Роль пользователя на сайте(пока сделаю так: 0 - админ, 1 - клиент, 2 - Курьер);
    """
    wallet_address = models.CharField(max_length=200, unique=True)
    role = models.IntegerField(default=1)
    def __str__(self):
        return self.wallet_address

