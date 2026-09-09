from django.db import models


class Categoria(models.Model):
    nome = models.CharField(max_length=40)

    class Meta:
        verbose_name = 'Categoria'

    def __str__(self):
        return self.nome


class Prato(models.Model):
    nome = models.CharField(max_length=40)
    descricao = models.TextField(default=str, max_length=200)
    preco = models.DecimalField(max_digits=5, decimal_places=2)
    preco_promocional = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='Preço promocional')
    imagem = models.ImageField(upload_to='pratos', null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    promocao = models.BooleanField(default=False, verbose_name='Em promoção?')

    class Meta:
        verbose_name = 'Prato'

    def __str__(self):
        return self.nome
