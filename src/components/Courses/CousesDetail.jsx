
import React from 'react'
import { useParams } from 'react-router-dom'
import {Star, Clock, Users, Award, Play, CheckCircle, User} from 'lucide-react'

const CourseDetail = () => {
  const { id } = useParams()

  // Mock data - em uma aplicação real, isso viria de uma API
  const course = {
    id: 1,
    title: "React.js Completo - Do Zero ao Avançado",
    instructor: {
      name: "Ana Silva",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Desenvolvedora Frontend com 8 anos de experiência em React.js",
      courses: 12,
      students: 15000
    },
    price: "R$ 199,90",
    originalPrice: "R$ 299,90",
    rating: 4.9,
    students: 1250,
    duration: "40h",
    level: "Intermediário",
    category: "Frontend",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Aprenda React.js desde os conceitos básicos até técnicas avançadas. Este curso abrangente vai te ensinar tudo que você precisa para se tornar um desenvolvedor React profissional.",
    whatYouWillLearn: [
      "Fundamentos do React",
      "Componentes funcionais e hooks",
      "Gerenciamento de estado com Redux",
      "Roteamento com React Router",
      "Testes com Jest e React Testing Library",
      "Deploy e otimização de performance"
    ],
    curriculum: [
      {
        module: "Cadastro",
        lessons: [
          { title: "Cadastro", duration: "15min", completed: false },
          { title: "Configurando o ambiente", duration: "20min", completed: false },
          { title: "Primeiro componente", duration: "25min", completed: false }
        ]
      },
      {
        module: "Módulo 2: Componentes e Props",
        lessons: [
          { title: "Criando componentes", duration: "30min", completed: false },
          { title: "Props e PropTypes", duration: "25min", completed: false },
          { title: "Composição de componentes", duration: "35min", completed: false }
        ]
      },
      {
        module: "Módulo 3: Estado e Hooks",
        lessons: [
          { title: "useState Hook", duration: "40min", completed: false },
          { title: "useEffect Hook", duration: "45min", completed: false },
          { title: "Hooks customizados", duration: "50min", completed: false }
        ]
      }
    ],
    reviews: [
      {
        name: "João Pedro",
        rating: 5,
        comment: "Excelente curso! A Ana explica muito bem e os exemplos são práticos.",
        date: "2024-01-15"
      },
      {
        name: "Maria Santos",
        rating: 5,
        comment: "Melhor curso de React que já fiz. Muito didático e completo.",
        date: "2024-01-10"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-blue-200 ml-1">({course.students} alunos)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration} de conteúdo</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">Instrutor: {course.instructor.name}</p>
                  <p className="text-blue-200 text-sm">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Card de Compra */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 text-gray-900">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-blue-600">{course.price}</span>
                    <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                  </div>
                  <p className="text-green-600 font-semibold">33% de desconto</p>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Comprar Agora
                </button>

                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mb-6">
                  Adicionar ao Carrinho
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Suporte do instrutor</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>30 dias de garantia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* O que você vai aprender */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">O que você vai aprender</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Currículo */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Conteúdo do Tutorial</h2>
              <div className="space-y-4">
                {course.curriculum.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">{module.module}</h3>
                      <p className="text-sm text-gray-600">{module.lessons.length} aulas</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Play className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="text-gray-700">{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avaliações */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações dos alunos</h2>
              <div className="space-y-6">
                {course.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar do Instrutor */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sobre o instrutor</h3>
              <div className="text-center mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900">{course.instructor.name}</h4>
                <p className="text-gray-600">{course.instructor.bio}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{course.instructor.courses}</p>
                  <p className="text-sm text-gray-600">Cursos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{course.instructor.students.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Alunos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
