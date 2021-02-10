package com.booktracker.app.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity(name = "User")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String first_name;
    private String last_name;
    private String email;

    @ManyToMany(fetch = FetchType.LAZY )
    @JoinTable(
            name = "user_books",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private Set<Book> bookList = new HashSet<>();

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object){
        if (this == object){
            return true;
        }
        if(!(object instanceof User)){
            return false;
        }
        User user = (User) object;
        return (Objects.equals(this.id, user.id)
                && Objects.equals(this.first_name , user.first_name)
                && Objects.equals(this.last_name , user.last_name)
                && Objects.equals(this.email , user.email));
    }

    @Override
    public int hashCode(){
        return Objects.hash(this.id , this.first_name , this.last_name , this.email);
    }

    // Utitlity Method of Adding Associations between user and books
    public void addBook(Book book){
        this.bookList.add(book);
        book.getReaders().add(this);
    }

    // Utitlity Method of removing Associations between user and books
    public void removeBook(Book book){
        this.bookList.remove(book);
        book.getReaders().remove(this);
    }

}
