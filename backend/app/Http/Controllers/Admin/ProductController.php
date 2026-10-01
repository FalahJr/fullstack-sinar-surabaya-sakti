<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return view('admin.products.index', compact('products'));
    }

    public function create()
    {
        $categories = ProductCategory::all();
        return view('admin.products.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'datasheet' => 'nullable|mimes:pdf,doc,docx,zip,xls,xlsx|max:5120',
        ], [
            'category_id.required' => 'Kategori produk harus dipilih.',
            'name.required' => 'Nama produk wajib diisi.',
            'image.image' => 'File harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal adalah 2MB.',
            'datasheet.mimes' => 'Datasheet harus berformat PDF, Word, Excel, atau ZIP.',
            'datasheet.max' => 'Ukuran datasheet maksimal adalah 5MB.',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imageName = 'product_' . time() . '.' . $request->image->extension();
            $request->image->move(public_path('img/products'), $imageName);
            $imagePath = 'img/products/' . $imageName;
        }

        $datasheetPath = null;
        if ($request->hasFile('datasheet')) {
            $datasheetName = 'datasheet_' . time() . '.' . $request->datasheet->extension();
            $request->datasheet->move(public_path('docs/datasheets'), $datasheetName);
            $datasheetPath = 'docs/datasheets/' . $datasheetName;
        }

        Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'sku' => $request->sku,
            'description' => $request->description,
            'image_path' => $imagePath,
            'datasheet_path' => $datasheetPath,
            'is_featured' => $request->has('is_featured'),
        ]);

        return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan ke katalog!');
    }

    public function edit(Product $product)
    {
        $categories = ProductCategory::all();
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'sku' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'datasheet' => 'nullable|mimes:pdf,doc,docx,zip,xls,xlsx|max:5120',
        ], [
            'category_id.required' => 'Kategori produk harus dipilih.',
            'name.required' => 'Nama produk wajib diisi.',
            'image.image' => 'File harus berupa gambar.',
            'image.max' => 'Ukuran gambar maksimal adalah 2MB.',
            'datasheet.mimes' => 'Datasheet harus berformat PDF, Word, Excel, atau ZIP.',
            'datasheet.max' => 'Ukuran datasheet maksimal adalah 5MB.',
        ]);

        $data = [
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'sku' => $request->sku,
            'description' => $request->description,
            'is_featured' => $request->has('is_featured'),
        ];

        if ($request->hasFile('image')) {
            $imageName = 'product_' . time() . '.' . $request->image->extension();
            $request->image->move(public_path('img/products'), $imageName);
            $data['image_path'] = 'img/products/' . $imageName;
        }

        if ($request->hasFile('datasheet')) {
            $datasheetName = 'datasheet_' . time() . '.' . $request->datasheet->extension();
            $request->datasheet->move(public_path('docs/datasheets'), $datasheetName);
            $data['datasheet_path'] = 'docs/datasheets/' . $datasheetName;
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus dari katalog!');
    }
}
