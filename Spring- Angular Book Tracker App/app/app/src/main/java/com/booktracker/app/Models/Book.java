package com.booktracker.app.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "Book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author_first_name;
    private String author_last_name;
    private String email;
    private String price;
    private String book_title;
    private String book_code;

    @ManyToMany(mappedBy = "bookList",fetch = FetchType.LAZY)
    private Set<User> readers = new HashSet<>();

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", author_first_name='" + author_first_name + '\'' +
                ", author_last_name='" + author_last_name + '\'' +
                ", email='" + email + '\'' +
                ", price='" + price + '\'' +
                ", book_title='" + book_title + '\'' +
                ", book_code='" + book_code + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object){
        if (this == object){
            return true;
        }
        if(!(object instanceof Book)){
            return false;
        }
        Book book = (Book) object;
        return (Objects.equals(this.id, book.id)
                && Objects.equals(this.author_first_name , book.author_first_name)
                && Objects.equals(this.author_last_name , book.author_last_name)
                && Objects.equals(this.email , book.email)
                && Objects.equals(this.price , book.price)
                && Objects.equals(this.book_title , book.book_title)
                && Objects.equals(this.book_code , book.book_code)
        );
    }

    @Override
    public int hashCode(){
        return Objects.hash(this.id , this.author_first_name , this.author_last_name ,
                this.email, this.book_title, this.book_code, this.price);
    }

    // Utitlity Method of Adding Associations between user and books
    public void addReader(User user){
        this.readers.add(user);
        user.getBookList().add(this);
    }

    // Utitlity Method of removing Associations between user and books
    public void removeReader(User user){
        this.readers.remove(user);
        user.getBookList().remove(this);
    }


}
