from abc import ABC, abstractmethod

from rest_framework.exceptions import ValidationError

from coctailsapi.models import Ingredient


class Filter(ABC):

    def __init__(self, query_param_name):
        self.param_name = query_param_name

    def filter(self, request, queryset):
        raw_value = request.query_params.get(self.param_name)

        if self._is_not_empty(raw_value):
            parsed_value = self._parse_value(raw_value)
            self._validate_value(parsed_value)
            queryset = self._apply_filter(queryset, parsed_value)

        return queryset

    @abstractmethod
    def _is_not_empty(self, raw_value):
        pass

    @abstractmethod
    def _parse_value(self, raw_value):
        pass

    @abstractmethod
    def _validate_value(self, parsed_value):
        pass

    @abstractmethod
    def _apply_filter(self, queryset, parsed_value):
        pass


class DrinkByIngredientsFilter(Filter):

    def _is_not_empty(self, raw_value):
        return bool(raw_value)

    def _parse_value(self, raw_value):
        return raw_value.split(',')

    def _validate_value(self, ingredients):
        for ingredient in ingredients:
            if not Ingredient.objects.filter(id=ingredient).first():
                raise ValidationError(f'Ingredient with id {ingredient} does not exist.', code=400)

    def _apply_filter(self, queryset, ingredients):
        for ingredient in ingredients:
            queryset = queryset.filter(measures__ingredient__id=ingredient)

        return queryset


class DrinkByAlcoholPresenceFilter(Filter):

    def _is_not_empty(self, raw_value):
        return raw_value is not None

    def _parse_value(self, raw_value):
        if raw_value == 'True':
            return True
        elif raw_value == 'False':
            return False
        else:
            return raw_value

    def _validate_value(self, is_alcoholic):
        if not isinstance(is_alcoholic, bool):
            raise ValidationError(f'Invalid value for alcoholic filter: {is_alcoholic}')

    def _apply_filter(self, queryset, is_alcoholic):
        return queryset.filter(is_alcoholic=is_alcoholic)
