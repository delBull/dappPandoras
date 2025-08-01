#!/bin/bash

echo "🌿 Cambiando a rama main..."
git checkout main

echo "🔄 Haciendo fetch desde upstream..."
git fetch upstream

echo "🧬 Haciendo merge de upstream/main en main..."
git merge upstream/main

echo "📤 Subiendo main actualizado a tu fork (origin)..."
git push origin main

echo "✅ ¡Main está sincronizado con el repositorio original!"
echo "🌟 Recuerda vovler a tu branch dev o de funciones"
