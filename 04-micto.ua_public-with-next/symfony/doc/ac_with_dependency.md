# Using autocomplete with dependency in the easyadmin

- Configure create/edit form fields using `AutocompleteDependentField`
```php
class TestCrudController extends AbstractCrudController
{
    public function configureFields(string $pageName): iterable
    {
        yield Field::new('name');
        yield AssociationField::new('area')->autocomplete();
        yield AutocompleteDependentField::new('district')
            ->dependsFrom('area', '#Test_area_autocomplete');
    }
}
```
In the `dependsFrom` method you need to set the field on which the current field will depend 
and the html ID of this element on the admin CRUD page

- Include trait to the district CRUD controller
```php
namespace App\Controller;

use App\Controller\Admin\AutocompleteWithDependencyTrait;

class DistrictCrudController extends AbstractCrudController
{
    use AutocompleteWithDependencyTrait;
   
   ...
}
```
